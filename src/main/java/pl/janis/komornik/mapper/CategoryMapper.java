package pl.janis.komornik.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import pl.janis.komornik.dto.CategoryDto;
import pl.janis.komornik.entities.Category;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(unmappedTargetPolicy = ReportingPolicy.WARN, componentModel = SPRING)
public interface CategoryMapper {
    CategoryDto toDto(Category category);

    @Mapping(target = "expenses", ignore = true)
    Category toEntity(CategoryDto dto);
}