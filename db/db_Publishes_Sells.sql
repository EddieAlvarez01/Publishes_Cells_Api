CREATE TABLE Role(
    id NUMBER(*) PRIMARY KEY,
    name VARCHAR2(20) NOT NULL
);

CREATE TABLE Room(
    id NUMBER(*) PRIMARY KEY,
    creationDate DATE NOT NULL
);

CREATE TABLE MemberClass(
    id NUMBER(*) PRIMARY KEY,
    name VARCHAR2(20) NOT NULL
);

CREATE TABLE ShoppingCart(
    id NUMBER(*) PRIMARY KEY
);

CREATE TABLE Action(
    id NUMBER(*) PRIMARY KEY,
    name VARCHAR2(25) NOT NULL
);

CREATE TABLE Color(
    id NUMBER(*) PRIMARY KEY,
    nombre VARCHAR2(30) NOT NULL
);

CREATE TABLE HomePage(
    id NUMBER(*) PRIMARY KEY,
    name VARCHAR2(30) NOT NULL,
    slogan VARCHAR2(55) NOT NULL,
    logo VARCHAR2(55) NOT NULL,
    video VARCHAR2(55) NOT NULL,
    mision VARCHAR2(200) NOT NULL,
    vision VARCHAR2(200) NOT NULL,
    aboutMe VARCHAR2(200) NOT NULL
);


CREATE TABLE User1(
   id NUMBER(*) PRIMARY KEY,
   name VARCHAR2(30) NOT NULL,
   lastName VARCHAR2(30) NOT NULL,
   password VARCHAR2(80) NOT NULL,
   email VARCHAR2(50) UNIQUE NOT NULL,
   phone VARCHAR2(15),
   photo VARCHAR2(55),
   gender CHAR(1),
   birthDay DATE NOT NULL,
   registrationDate DATE NOT NULL,
   address VARCHAR2(20),
   availableCredit NUMBER(*,2) NOT NULL,
   profitEarned NUMBER(*,2),
   state NUMBER(1) NOT NULL,
   idRole NUMBER(*) NOT NULL,
   idShoppingCart NUMBER(*) NOT NULL UNIQUE,
   idMemberClass NUMBER(*) NOT NULL,
   FOREIGN KEY(idRole) REFERENCES Role(id),
   FOREIGN KEY(idMemberClass) REFERENCES MemberClass(id),
   FOREIGN KEY(idShoppingCart) REFERENCES ShoppingCart(id)
);

CREATE TABLE Category(
    id NUMBER(*) PRIMARY KEY,
    name VARCHAR2(30) NOT NULL,
    description VARCHAR2(100),
    fatherCategory NUMBER(*),
    FOREIGN KEY(fatherCategory) REFERENCES Category(id)
);

CREATE TABLE Product(
    id NUMBER(*) PRIMARY KEY,
    code VARCHAR2(100) NOT NULL,
    image VARCHAR2(55) NOT NULL,
    description VARCHAR2(100),
    price NUMBER(*,2) NOT NULL,
    publicationDate DATE NOT NULL,
    stock NUMBER(*) NOT NULL,
    idCategory NUMBER(*) NOT NULL,
    FOREIGN KEY(idCategory) REFERENCES Category(id)
);

CREATE TABLE Product_Color(
    idColor NUMBER(*) NOT NULL,
    idProduct NUMBER(*) NOT NULL,
    FOREIGN KEY(idColor) REFERENCES Color(id),
    FOREIGN KEY(idProduct) REFERENCES Product(id)
);

CREATE TABLE ProductCart(
    idShoppingCart NUMBER(*) NOT NULL,
    idProduct Number(*) NOT NULL,
    quantity NUMBER(*) NOT NULL,
    FOREIGN KEY(idShoppingCart) REFERENCES ShoppingCart(id),
    FOREIGN KEY(idProduct) REFERENCES Product(id)
);

CREATE TABLE Commentary(
    id NUMBER(*) PRIMARY KEY,
    creationDate DATE NOT NULL,
    title VARCHAR2(30),
    content VARCHAR2(200) NOT NULL,
    idUser NUMBER(*) NOT NULL,
    idProduct NUMBER(*) NOT NULL,
    FOREIGN KEY(idUser) REFERENCES User1(id),
    FOREIGN KEY(idProduct) REFERENCES Product(id)
);

CREATE TABLE Weighing(
    idProduct NUMBER(*),
    idUser NUMBER(*),
    quantity NUMBER(*,2) NOT NULL,
    FOREIGN KEY(idProduct) REFERENCES Product(id),
    FOREIGN KEY(idUser) REFERENCES User1(id),
    PRIMARY KEY(idProduct, idUser)
);

CREATE TABLE ProductUser(
    idProduct NUMBER(*) NOT NULL,
    idUser NUMBER(*) NOT NULL,
    FOREIGN KEY(idProduct) REFERENCES Product(id),
    FOREIGN KEY(idUser) REFERENCES User1(id)
);

CREATE TABLE Log(
    idAction NUMBER(*) NOT NULL,
    idUser NUMBER(*) NOT NULL,
    description VARCHAR2(100),
    FOREIGN KEY(idAction) REFERENCES Action(id),
    FOREIGN KEY(idUser) REFERENCES User1(id)
);

CREATE TABLE Bill(
    id NUMBER(*) PRIMARY KEY,
    client VARCHAR2(50) NOT NULL,
    shoppingCart NUMBER(*) NOT NULL,
    dateBill DATE NOT NULL,
    total NUMBER(*,2) NOT NULL
);

CREATE TABLE BillDetail(
    idBill NUMBER(*) NOT NULL,
    idProduct NUMBER(*) NOT NULL,
    quantity NUMBER(*) NOT NULL,
    FOREIGN KEY(idBill) REFERENCES Bill(id),
    FOREIGN KEY(idProduct) REFERENCES Product(id)
);

DROP TABLE BillDetail;
DROP TABLE ProductUser;
DROP TABLE Weighing;
DROP TABLE Commentary;
DROP TABLE ProductCart;
DROP TABLE Product_Color;
DROP TABLE Product;

CREATE TABLE RoomUser(
    idRoom NUMBER(*) NOT NULL,
    idUser NUMBER(*) NOT NULL,
    FOREIGN KEY(idRoom) REFERENCES Room(id) ON DELETE CASCADE,
    FOREIGN KEY(idUser) REFERENCES User1(id)
);

CREATE TABLE Message(
    id NUMBER(*) PRIMARY KEY,
    idUser NUMBER(*) NOT NULL,
    idRoom NUMBER(*) NOT NULL,
    content VARCHAR2(200) NOT NULL,
    creationDate DATE NOT NULL,
    FOREIGN KEY(idUser) REFERENCES User1(id),
    FOREIGN KEY(idRoom) REFERENCES Room(id) ON DELETE CASCADE
);

INSERT INTO Role(id, name)
VALUES(1, 'administrador');
INSERT INTO Role(id, name)
VALUES(2, 'help desk');
INSERT INTO Role(id, name)
VALUES(3, 'cliente');

INSERT INTO MemberClass(id, name)
VALUES(1, 'diamante');
INSERT INTO MemberClass(id, name)
VALUES(2, 'platino');
INSERT INTO MemberClass(id, name)
VALUES(3, 'oro');
INSERT INTO MemberClass(id, name)
VALUES(4, 'plata');
INSERT INTO MemberClass(id, name)
VALUES(5, 'bronce');

INSERT INTO HomePage(id, name, slogan, logo, video, mision, vision, aboutMe)
VALUES(1, 'Publishes and sells', 'route', 'route', 'naturaleza.mp4', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s');

INSERT INTO ShoppingCart(id)
VALUES(sec_idShoppingCart.nextval);

INSERT INTO User1(id, name, lastName, password, email, phone, photo, gender, birthDay, registrationDate, address, availableCredit, profitEarned, state, idRole, idShoppingCart, idMemberClass)
VALUES(1, 'admin', 'admin', 'admin1', 'admin@gmail.com', '448887', null, null, TO_DATE('11-11-2010', 'DD-MM-YYYY'), SYSDATE, null, 0, 0, 2, 1, 1, 1);

CREATE SEQUENCE sec_idRoom
START WITH 1
MINVALUE 1
INCREMENT BY 1
ORDER;

CREATE SEQUENCE sec_idProduct
START WITH 1
MINVALUE 1
INCREMENT BY 1
ORDER;

CREATE SEQUENCE sec_idColor
START WITH 1
MINVALUE 1
INCREMENT BY 1
ORDER;

CREATE SEQUENCE sec_idShoppingCart
START WITH 1
MINVALUE 1
INCREMENT BY 1
ORDER;

CREATE SEQUENCE sec_idUser
START WITH 2
MINVALUE 2
INCREMENT BY 1
ORDER;

CREATE SEQUENCE sec_idCategory
START WITH 1
MINVALUE 1
INCREMENT BY 1
ORDER;

CREATE SEQUENCE sec_idCommentary
START WITH 1
MINVALUE 1
INCREMENT BY 1
ORDER;

CREATE SEQUENCE sec_idBill
START WITH 1
MINVALUE 1
INCREMENT BY 1
ORDER;

CREATE SEQUENCE sec_idMessage
START WITH 1
MINVALUE 1
INCREMENT BY 1
ORDER;

CREATE OR REPLACE PROCEDURE RegisterUser(wname IN VARCHAR2, wlastName IN VARCHAR2, wpassword IN VARCHAR2, wemail IN VARCHAR2, wphone IN VARCHAR2, wphoto IN VARCHAR2, wgender IN CHAR, wbirthDay IN DATE,
                                        wregistrationDate IN DATE, waddress IN VARCHAR2, wavailableCredit IN NUMBER, wprofitEarned IN NUMBER, wstate IN NUMBER, widRole IN NUMBER, widMemberClass IN NUMBER)
IS
total NUMBER;
BEGIN
    total := 0;
    SELECT COUNT(*) INTO total FROM User1 WHERE email = wemail;
    
    IF total = 0 THEN
        INSERT INTO ShoppingCart(id)
        VALUES(sec_idShoppingCart.nextval);
        INSERT INTO User1(id, name, lastName, password, email, phone, photo, gender, birthDay, registrationDate, address, availableCredit, profitEarned, state, idRole, idShoppingCart, idMemberClass)
        VALUES(sec_idUser.nextval, wname, wlastName, wpassword, wemail, wphone, wphoto, wgender, wbirthDay, wregistrationDate, waddress, wavailableCredit, wprofitEarned, wstate, widRole, sec_idShoppingCart.currval, widMemberClass);
    END IF;
END;

CREATE OR REPLACE PROCEDURE InsertLoad(wcode VARCHAR2, wimg VARCHAR2, wdescription VARCHAR2, wfatherCategory VARCHAR2, wdaughterCategory VARCHAR2, wprice NUMBER, wcolor VARCHAR2, wpublicationDate DATE,
                                        widUser NUMBER, wstock NUMBER)
IS
    totalFatherCategory NUMBER;
    totalDaughterCategory NUMBER;
    totalColor NUMBER;
    idFatherC NUMBER;
    idDaughterC NUMBER;
    idColor NUMBER;
BEGIN
    idFatherC := -1;
    idDaughterC := -1;
    IF wdaughterCategory IS NOT null THEN
        totalFatherCategory := 0;
        SELECT COUNT(*) INTO totalFatherCategory FROM Category WHERE LOWER(name) = LOWER(wfatherCategory);
        IF totalFatherCategory = 0 THEN
            INSERT INTO Category(id, name, description, fatherCategory)
            VALUES(sec_idCategory.nextval, wfatherCategory, null, null);
            idFatherC := sec_idCategory.currval;
            totalDaughterCategory := 0;
            SELECT COUNT(*) INTO totalDaughterCategory FROM Category WHERE LOWER(name) = LOWER(wdaughterCategory);
            IF totalDaughterCategory = 0 THEN
                INSERT INTO Category(id, name, description, fatherCategory)
                VALUES(sec_idCategory.nextval, wdaughterCategory, null, idFatherC);
                idDaughterC := sec_idCategory.currval;
            ELSE
                SELECT id INTO idDaughterC FROM Category WHERE LOWER(name) = LOWER(wdaughterCategory);
            END IF;
        ELSE
            SELECT id INTO idFatherC FROM Category WHERE LOWER(name) = LOWER(wfatherCategory);
            totalDaughterCategory := 0;
            SELECT COUNT(*) INTO totalDaughterCategory FROM Category WHERE LOWER(name) = LOWER(wdaughterCategory);
            IF totalDaughterCategory = 0 THEN
                INSERT INTO Category(id, name, description, fatherCategory)
                VALUES(sec_idCategory.nextval, wdaughterCategory, null, idFatherC);
                idDaughterC := sec_idCategory.currval;
            ELSE
                SELECT id INTO idDaughterC FROM Category WHERE LOWER(name) = LOWER(wdaughterCategory);
            END IF;
        END IF;
        totalColor := 0;
        SELECT COUNT(*) INTO totalColor FROM Color WHERE LOWER(nombre) = LOWER(wcolor);
        IF totalColor = 0 THEN
            INSERT INTO Color(id, nombre)
            VALUES(sec_idColor.nextval, wcolor);
            idColor := sec_idColor.currval;   
        ELSE
            SELECT id INTO idColor FROM Color WHERE LOWER(nombre) = LOWER(wcolor);
        END IF;
        INSERT INTO Product(id, code, image, description, price, publicationDate, stock, idCategory)
        VALUES(sec_idProduct.nextval, wcode, wimg, wdescription, wprice, wpublicationDate, wstock, idDaughterC);
        INSERT INTO ProductUser(idProduct, idUser)
        VALUES(sec_idProduct.currval, widUser);
        INSERT INTO Product_Color(idColor, idProduct)
        VALUES(idColor, sec_idProduct.currval);
    ELSE
        SELECT COUNT(*) INTO totalFatherCategory FROM Category WHERE LOWER(name) = LOWER(wfatherCategory);
        IF totalFatherCategory = 0 THEN
            INSERT INTO Category(id, name, description, fatherCategory)
            VALUES(sec_idCategory.nextval, wfatherCategory, null, null);
            idFatherC := sec_idCategory.currval;
        ELSE
            SELECT id INTO idFatherC FROM Category WHERE LOWER(name) = LOWER(wfatherCategory);
        END IF;
        totalColor := 0;
        SELECT COUNT(*) INTO totalColor FROM Color WHERE LOWER(nombre) = LOWER(wcolor);
        IF totalColor = 0 THEN
            INSERT INTO Color(id, nombre)
            VALUES(sec_idColor.nextval, wcolor);
            idColor := sec_idColor.currval;   
        ELSE
            SELECT id INTO idColor FROM Color WHERE LOWER(nombre) = LOWER(wcolor);
        END IF;
        INSERT INTO Product(id, code, image, description, price, publicationDate, stock, idCategory)
        VALUES(sec_idProduct.nextval, wcode, wimg, wdescription, wprice, wpublicationDate, wstock, idFatherC);
        INSERT INTO ProductUser(idProduct, idUser)
        VALUES(sec_idProduct.currval, widUser);
        INSERT INTO Product_Color(idColor, idProduct)
        VALUES(idColor, sec_idProduct.currval);
    END IF;
END;

SELECT * FROM Category;

SELECT P.*, C.name 
FROM PRODUCT P
INNER JOIN Category C ON C.id = P.idCategory
WHERE P.idCategory = 38 OR C.fatherCategory = 38;

SELECT p.id, p.image, p.description, p.price, c.nombre  
FROM Product_Color pc
INNER JOIN Product p ON p.id = pc.idProduct
INNER JOIN Color c ON c.id = pc.idColor;

SELECT p.id, p.image, p.description, p.price, c.nombre, ca.name  
FROM Product_Color pc
INNER JOIN Product p ON p.id = pc.idProduct
INNER JOIN Color c ON c.id = pc.idColor
INNER JOIN Category ca ON ca.id = p.idCategory
WHERE p.idCategory = 38 OR ca.fatherCategory = 38;

SELECT p.id, p.image, p.description, p.price, c.nombre, us1.name, us1.lastName
				FROM Product_Color pc
				INNER JOIN Product p ON p.id = pc.idProduct
				INNER JOIN Color c ON c.id = pc.idColor
				INNER JOIN ProductUser pu ON pu.idProduct = p.id
				INNER JOIN User1 us1 ON us1.id = pu.idUser
				WHERE LOWER(p.description) LIKE '%s10%';

DELETE FROM Product_Color;
DELETE FROM ProductUser;
DELETE FROM Product;
DELETE FROM category;