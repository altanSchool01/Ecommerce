const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const errorMiddleware = require("./middleware/error");
const appRoutes = require("./routes/route");
const swaggerJsdoc = require("swagger-jsdoc"),
swaggerUi = require("swagger-ui-express");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(fileUpload());
app.use("/api/v1", appRoutes)

// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });

// Middleware for Errors
app.use(errorMiddleware);

//Swagger Configuration  
const swaggerOptions = {  
    swaggerDefinition: {  
        info: {  
            title:'Employee API',  
            version:'1.0.0'  
        }  
    },  
    apis:['./backend/routes/*.js','./backend/models/dto/models.js'],  
}  
const swaggerDocs = swaggerJsdoc(swaggerOptions);  
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));  

module.exports = app;




