package com.prakash.demo.react2019destinations.repo;

import com.prakash.demo.react2019destinations.model.City;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CityRepository extends JpaRepository<City, Long> {
    public List<City> findFirst4ByOrderByRank();
}
