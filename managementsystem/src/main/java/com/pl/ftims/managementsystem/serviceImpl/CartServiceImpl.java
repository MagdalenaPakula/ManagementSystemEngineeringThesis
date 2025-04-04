package com.pl.ftims.managementsystem.serviceImpl;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.pl.ftims.managementsystem.JWT.JwtFilter;
import com.pl.ftims.managementsystem.POJO.Cart;
import com.pl.ftims.managementsystem.constants.BusinessConstants;
import com.pl.ftims.managementsystem.dao.CartDao;
import com.pl.ftims.managementsystem.service.CartService;
import com.pl.ftims.managementsystem.utils.BusinessUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.io.IOUtils;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Stream;

@Slf4j
@Service
public class CartServiceImpl implements CartService {

    @Autowired
    JwtFilter jwtFilter;

    @Autowired
    CartDao cartDao;

    @Override
    public ResponseEntity<String> generateReport(Map<String, Object> requestMap) {
        log.info("Inside generateReport");
        try {
            String fileName;
            if (validateRequestMap(requestMap)) {
                if (requestMap.containsKey("isGenerate") && !(Boolean)requestMap.get("isGenerate")) {
                    fileName = (String) requestMap.get("uuid");
                } else {
                    fileName = BusinessUtils.getUUID();
                    requestMap.put("uuid", fileName);
                    insertCart(requestMap);
                }
                String data = "Name: " + requestMap.get("name") + "\n" +
                        "E-mail: " + requestMap.get("email") + "\n" +
                        "paymentMethod: " + requestMap.get("paymentMethod");

                Document document = new Document();
                PdfWriter.getInstance(document, new FileOutputStream(BusinessConstants.STORE_LOCATION+"\\"+fileName+".pdf"));

                document.open();
                setRectangleInPdf(document);

                Paragraph chunk = new Paragraph("Business Management", getFont("Header"));
                chunk.setAlignment(Element.ALIGN_CENTER);
                document.add(chunk);

                Paragraph paragraph = new Paragraph(data + "\n \n", getFont("Data"));
                document.add(paragraph);

                PdfPTable table = new PdfPTable(5);
                table.setWidthPercentage(100);
                addTableHeader(table);

                JSONArray jsonArray = BusinessUtils.getJsonArrayFromString((String) requestMap.get("productDetails"));
                for(int i=0; i<jsonArray.length(); i++){
                    addRows(table, BusinessUtils.getMapFromJson(jsonArray.getString(i)));
                }
                document.add(table);

                Paragraph footer = new Paragraph("Total : "+requestMap.get("totalAmount") + "\n"
                        + "Thank You for visiting.Please visit again", getFont("Data"));
                document.add(footer);
                document.close();
                return new ResponseEntity<>("{\"uuid\":\""+fileName+"\"}", HttpStatus.OK);
            }
            return BusinessUtils.getResponseEntity("Required data not found", HttpStatus.BAD_REQUEST);
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return BusinessUtils.getResponseEntity(BusinessConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }


    private void addRows(PdfPTable table, Map<String, Object> data) {
        log.info("Inside addRows");
        table.addCell((String) data.get("name"));
        table.addCell((String) data.get("category"));

        // Assuming that "quantity," "price," and "total" are numeric values
        table.addCell(String.valueOf(data.get("quantity")));
        table.addCell(String.valueOf(data.get("price")));
        table.addCell(String.valueOf(data.get("total")));
    }


    private void addTableHeader(PdfPTable table) {
        log.info("Inside addTableHeader");
        Stream.of("Name", "Category", "Quantity", "Price", "Sub Total")
                .forEach(columnTitle ->{
                    PdfPCell header = new PdfPCell();
                    header.setBackgroundColor(new BaseColor(240, 239, 239));
                    header.setBorderWidth(2);
                    header.setPhrase(new Phrase(columnTitle));
                    header.setBackgroundColor(new BaseColor(255, 140, 33));
                    header.setHorizontalAlignment(Element.ALIGN_CENTER);
                    header.setVerticalAlignment(Element.ALIGN_CENTER);
                    table.addCell(header);
                });

    }

    private Font getFont(String type) {
        log.info("Inside getFont");
        switch (type) {
            case "Header" -> {
                Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLDOBLIQUE, 16, BaseColor.BLACK);
                headerFont.setStyle(Font.BOLD);
                return headerFont;
            }
            case "Data" -> {
                Font dataFont = FontFactory.getFont(FontFactory.TIMES_ROMAN, 11, BaseColor.BLACK);
                dataFont.setStyle(Font.BOLD);
                return dataFont;
            }
            default -> {
                return new Font();
            }
        }
    }

    private void setRectangleInPdf(Document document) throws DocumentException {
        log.info("Inside setRectangleInPdf");
        Rectangle rectangle = new Rectangle(577,825,18,15);
        rectangle.enableBorderSide(1);
        rectangle.enableBorderSide(2);
        rectangle.enableBorderSide(4);
        rectangle.enableBorderSide(8);
        rectangle.setBorderColor(BaseColor.BLACK);
        rectangle.setBorderWidth(1);
        document.add(rectangle);
    }

    private void insertCart(Map<String, Object> requestMap) {
        try {
            Cart cart = new Cart();
            cart.setUuid((String) requestMap.get("uuid"));
            cart.setName((String) requestMap.get("name"));
            cart.setEmail((String) requestMap.get("email"));
            cart.setPaymentMethod((String) requestMap.get("paymentMethod"));
            cart.setTotalAmount(Float.parseFloat((String) requestMap.get("totalAmount")));
            cart.setProductDetails((String) requestMap.get("productDetails"));
            cart.setCreatedBy(jwtFilter.getCurrentUser());
            cartDao.save(cart);
        } catch (Exception exception){
            exception.printStackTrace();
        }
    }

    private boolean validateRequestMap(Map<String, Object> requestMap) {
        return requestMap.containsKey("name") &&
                requestMap.containsKey("email") &&
                requestMap.containsKey("paymentMethod") &&
                requestMap.containsKey("productDetails") &&
                requestMap.containsKey("totalAmount");
    }

    @Override
    public ResponseEntity<List<Cart>> getBills() {
        List<Cart> list;
        if(jwtFilter.isAdmin()){
            list = cartDao.getAllBills();
        }else{
            list = cartDao.getBillByUserName(jwtFilter.getCurrentUser());
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<byte[]> getPdf(Map<String, Object> requestMap) {
        log.info("Inside getPdf : requestMap {}", requestMap);
        try{
            byte[] byteArray = new byte[0];
            if(!requestMap.containsKey("uuid") && validateRequestMap(requestMap))
                return new ResponseEntity<>(byteArray, HttpStatus.BAD_REQUEST);
            String filePath = BusinessConstants.STORE_LOCATION+"\\"+ requestMap.get("uuid") + ".pdf";
            if(BusinessUtils.isFileExist(filePath)){
                byteArray = getByteArray(filePath);
                return new ResponseEntity<>(byteArray,HttpStatus.OK);
            } else {
                requestMap.put("isGenerate", false);
                generateReport(requestMap);
                byteArray = getByteArray(filePath);
                return new ResponseEntity<>(byteArray, HttpStatus.OK);
            }

        }catch(Exception exception){
            exception.printStackTrace();
        }
        return null;
    }
    @Override
    public ResponseEntity<String> deleteBill(Integer id) {
        try {
            Optional<Cart> optional = cartDao.findById(id);
            if(optional.isPresent()){
                cartDao.deleteById(id);
                return BusinessUtils.getResponseEntity("Bill Deleted Successfully", HttpStatus.OK);
            }
            return BusinessUtils.getResponseEntity("Bill ID does not exist", HttpStatus.OK);
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return BusinessUtils.getResponseEntity(BusinessConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private byte[] getByteArray(String filePath) throws Exception {
        File initialFile = new File(filePath);
        InputStream targetStream = new FileInputStream(initialFile);
        byte[] byteArray = IOUtils.toByteArray(targetStream);
        targetStream.close();
        return byteArray;
    }
}
