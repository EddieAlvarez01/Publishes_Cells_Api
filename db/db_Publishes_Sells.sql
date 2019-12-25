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
   phone VARCHAR2(15) NOT NULL,
   photo VARCHAR2(55) NOT NULL,
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
    code VARCHAR2(100) PRIMARY KEY,
    image VARCHAR2(55) NOT NULL,
    description VARCHAR2(100),
    price NUMBER(*,2) NOT NULL,
    publicationDate DATE NOT NULL,
    stock NUMBER(*) NOT NULL,
    color VARCHAR2(25),
    idCategory NUMBER(*) NOT NULL,
    FOREIGN KEY(idCategory) REFERENCES Category(id)
);

CREATE TABLE ProductCart(
    idShoppingCart NUMBER(*) NOT NULL,
    idProduct VARCHAR2(100) NOT NULL,
    quantity NUMBER(*) NOT NULL,
    FOREIGN KEY(idShoppingCart) REFERENCES ShoppingCart(id),
    FOREIGN KEY(idProduct) REFERENCES Product(code)
);

CREATE TABLE Commentary(
    id NUMBER(*) PRIMARY KEY,
    creationDate DATE NOT NULL,
    title VARCHAR2(30),
    content VARCHAR2(200) NOT NULL,
    idUser NUMBER(*) NOT NULL,
    idProduct VARCHAR2(100) NOT NULL,
    FOREIGN KEY(idUser) REFERENCES User1(id),
    FOREIGN KEY(idProduct) REFERENCES Product(code)
);

CREATE TABLE Weighing(
    idProduct VARCHAR2(100),
    idUser NUMBER(*),
    quantity NUMBER(*,2) NOT NULL,
    FOREIGN KEY(idProduct) REFERENCES Product(code),
    FOREIGN KEY(idUser) REFERENCES User1(id),
    PRIMARY KEY(idProduct, idUser)
);

CREATE TABLE ProductUser(
    idProduct VARCHAR2(100) NOT NULL,
    idUser NUMBER(*) NOT NULL,
    FOREIGN KEY(idProduct) REFERENCES Product(code),
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
    idProduct VARCHAR2(100) NOT NULL,
    quantity NUMBER(*) NOT NULL,
    FOREIGN KEY(idBill) REFERENCES Bill(id),
    FOREIGN KEY(idProduct) REFERENCES Product(code)
);

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
VALUES(1, 'Publishes and sells', 'route', 'route', 'route', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s');

CREATE SEQUENCE sec_idRoom
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