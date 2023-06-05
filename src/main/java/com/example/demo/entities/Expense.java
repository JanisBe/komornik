package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "expenses", schema = "test")
public class Expense implements Cloneable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(name = "currency", nullable = false)
    private String currency;

    @Column(name = "description", nullable = false)
    private String description;

    @OneToMany(mappedBy = "id")
    private List<Debt> debt;

    @ManyToOne(fetch = FetchType.EAGER, optional = false, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "group_id", nullable = false)
    @JsonIgnore
    private Group group;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "date", nullable = false, columnDefinition = "TIMESTAMP")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime date;

    @Column(name = "note")
    private String note;

    @Override
    public Object clone() throws CloneNotSupportedException {
        return super.clone();
    }

}
