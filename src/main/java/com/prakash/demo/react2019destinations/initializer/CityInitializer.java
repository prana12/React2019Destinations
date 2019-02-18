package com.prakash.demo.react2019destinations.initializer;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.Module;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.prakash.demo.react2019destinations.model.City;
import com.prakash.demo.react2019destinations.repo.CityRepository;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.List;

@Component
public class CityInitializer implements CommandLineRunner {
    private final Logger log = LoggerFactory.getLogger(CityInitializer.class);
    private ObjectMapper mapper = new ObjectMapper().configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
    private final CityRepository cityRepository;

    public CityInitializer(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    public void run(String ... args) throws Exception {
        List<City> cities = null;
        String citiesJson = "/data/cities.json";
        try {
            this.mapper.registerModule((Module)new JavaTimeModule());
            cities = (List)this.mapper.readValue(IOUtils.toString((InputStream)this.getClass().getResourceAsStream(citiesJson), (Charset)StandardCharsets.UTF_8), new TypeReference<List<City>>() {});
        }
        catch (IOException e) {
            this.log.error("Could not pre-populate the collection 'City' with the predefined JSON data in {} due to the occurrence of an IO Exception.", citiesJson);
            cities = Collections.emptyList();
        }
        for (City tempCity : cities) {
            City city = City.builder().name(tempCity.getName()).rank(tempCity.getRank()).country(tempCity.getCountry()).capital(tempCity.getCapital()).summary(tempCity.getSummary()).updatedOn(tempCity.getUpdatedOn()).areaInKilometers(tempCity.getAreaInKilometers()).areaInSquareMiles(tempCity.getAreaInSquareMiles()).populationCount(tempCity.getPopulationCount()).populationCountYear(tempCity.getPopulationCountYear()).img(tempCity.getImg()).build();
            this.cityRepository.save(city);
        }
        this.cityRepository.findAll().forEach(System.out::println);
    }
}
