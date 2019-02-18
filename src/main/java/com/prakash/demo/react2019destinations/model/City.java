package com.prakash.demo.react2019destinations.model;

import java.time.Instant;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="city")
public class City {
    @Id
    @GeneratedValue
    private Long id;
    @NonNull
    private Integer rank;
    @NonNull
    private String name;
    private String country;
    @NonNull
    private Boolean capital;
    @Lob
    @NonNull
    private String summary;
    private Instant updatedOn;
    private Float areaInKilometers;
    private Float areaInSquareMiles;
    private Integer populationCount;
    private Integer populationCountYear;
    private String img;
}
