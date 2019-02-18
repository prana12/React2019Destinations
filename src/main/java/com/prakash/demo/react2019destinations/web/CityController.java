package com.prakash.demo.react2019destinations.web;

import com.prakash.demo.react2019destinations.model.City;
import com.prakash.demo.react2019destinations.repo.CityRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping(value={"/api"})
public class CityController {
    private final Logger log = LoggerFactory.getLogger(CityController.class);
    private CityRepository cityRepository;

    public CityController(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    @GetMapping(value={"/cities"})
    Collection<City> cities() {
        return this.cityRepository.findAll();
    }

    @GetMapping(value={"/city/{id}"})
    ResponseEntity<?> getCity(@PathVariable(value="id") Long id) {
        this.log.info("Request to get city: {}", (Object)id);
        Optional<City> city = this.cityRepository.findById(id);
        return city.map(response -> ResponseEntity.ok().body((Object)city)).orElse(new ResponseEntity(HttpStatus.NOT_FOUND));
    }

    @PostMapping(value={"/city"})
    ResponseEntity<City> createCity(@Valid @RequestBody City city) throws URISyntaxException {
        this.log.info("Request to create city: {}", city);
        City result = (City)this.cityRepository.save(city);
        return ResponseEntity.created((URI)new URI("/api/city/" + result.getId())).body(result);
    }

    @PutMapping(value={"/city"})
    ResponseEntity<City> updateCity(@Valid @RequestBody City city) {
        this.log.info("Request to update city: {}", city);
        City result = (City)this.cityRepository.save(city);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping(value={"/city/{id}"})
    public ResponseEntity<?> deleteCity(@PathVariable Long id) {
        this.log.info("Request to delete city: {}", id);
        this.cityRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping(value={"/citiesTop"})
    Collection<City> citiesTop() {
        return this.cityRepository.findFirst4ByOrderByRank();
    }
}