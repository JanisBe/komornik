package com.example.demo.mapper;

import com.example.demo.dto.DebtDto;
import com.example.demo.entities.Debt;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(unmappedTargetPolicy = ReportingPolicy.WARN, componentModel = SPRING)
public abstract class DebtMapper {

    @Mapping(target = "expense", ignore = true)
    @Mapping(target = "amount", source = "amount")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "userTo.id", source = "to")
    @Mapping(target = "userFrom.id", source = "from")
    abstract Debt toEntity(DebtDto debtDto);

    @Mapping(target = "to", source = "userTo.id")
    @Mapping(target = "from", source = "userFrom.id")
    @Mapping(target = "amount", source = "amount")
    abstract DebtDto toDto(Debt debt);
}