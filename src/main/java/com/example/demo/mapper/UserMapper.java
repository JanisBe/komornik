package com.example.demo.mapper;

import com.example.demo.dto.UserDto;
import com.example.demo.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.WARN, componentModel = MappingConstants.ComponentModel.SPRING)
public abstract class UserMapper {

    @Mapping(target = "name", source = "username")
    @Mapping(target = "groups", ignore = true)
    @Mapping(target = "password", ignore = true)
    public abstract User toEntity(UserDto userDto);

    @Mapping(target = "token", ignore = true)
    @Mapping(target = "withToken", ignore = true)
    public abstract UserDto toDto(User user);
}
