package ru.floretn.ha.domain;

import lombok.Getter;
import lombok.Setter;
import ru.floretn.ha.beans.RecordTypes;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "t_records", schema = "ha_data")
public class RecordEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rec_pk")
    private long recordId;
    @Column(name = "rec_amount")
    private int amount;
    @Column(name = "rec_desc")
    private String description;
    @Column(name = "rec_type")
    @Enumerated(EnumType.STRING)
    private RecordTypes type;
    @Column(name = "rec_date")
    private LocalDateTime date;
}
