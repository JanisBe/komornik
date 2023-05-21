package com.example.demo.mapper;

import com.example.demo.dto.UserDto;
import com.example.demo.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public abstract class UserMapper {

    @Mapping(target = "groups", ignore = true)
    public abstract User toEntity(UserDto userDto);

    public abstract UserDto toDto(User user);
}
