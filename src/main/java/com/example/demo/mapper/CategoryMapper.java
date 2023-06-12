package com.example.demo.mapper;

import com.example.demo.dto.CategoryDto;
import com.example.demo.entities.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(unmappedTargetPolicy = ReportingPolicy.WARN, componentModel = SPRING)
public interface CategoryMapper {
    CategoryDto toDto(Category category);

    @Mapping(target = "expenses", ignore = true)
    Category toEntity(CategoryDto dto);
}