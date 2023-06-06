package com.example.demo.mapper;

import com.example.demo.dto.DebtDto;
import com.example.demo.entities.Debt;
import com.example.demo.entities.User;
import com.example.demo.service.UserService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;
import org.springframework.beans.factory.annotation.Autowired;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(unmappedTargetPolicy = ReportingPolicy.WARN, componentModel = SPRING)
public abstract class DebtMapper {

    @Autowired
    protected UserService userService;

    @Mapping(target = "expense", ignore = true)
    @Mapping(target = "amount", source = "amount")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "toUserId", source = "to", qualifiedByName = "mapUsers")
    @Mapping(target = "fromUserId", source = "from", qualifiedByName = "mapUsers")
    abstract Debt toEntity(DebtDto debtDto);

    @Mapping(target = "to", source = "toUserId.id")
    @Mapping(target = "from", source = "fromUserId.id")
    @Mapping(target = "amount", source = "amount")
    abstract DebtDto toDto(Debt debt);

    @Named("mapUsers")
    User mapUsers(int userId) {
        return userService.findById(userId);
    }
}