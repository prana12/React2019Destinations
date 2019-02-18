# React2019Destinations

A basic demo web application built using Spring Boot and React JS. Users can browse the top 10 cities to travel in 2019 as recommeded by lonelyplanet website. 
Information about cities is stored in a json file in data folder. At the start of the application, the information is read by object mapper and list is initialized for application.
The application makes use of H2, one of the popular in memory databases(which Spring has very good integration) to hold application data.
The home page includes the navbar(with links to Home, Admin and Github website) and body contains link to access full list of cities. 
User can click on any of the city images to find the details(which includes big image, summary and some bullet points about a specific city). On clicking on Admin navbar link, it displays the list of cities in admin view. Admin can either add a new or edit an existing city.

Following technologies were used;

Spring Core
Spring Data JPA
Spring Rest API
React JS
Bootstrap
Maven
JSON

After downloading the application, you should be able to run using ./mvnw spring-boot:run(or mvn spring-boot:run) and see the app run on http://localhost:8080
