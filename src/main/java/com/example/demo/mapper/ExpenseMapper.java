package com.example.demo.mapper;

import com.example.demo.dto.ExpenseDto;
import com.example.demo.entities.Category;
import com.example.demo.entities.Expense;
import com.example.demo.entities.Group;
import com.example.demo.service.CategoryService;
import com.example.demo.service.GroupService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;
import org.springframework.beans.factory.annotation.Autowired;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(unmappedTargetPolicy = ReportingPolicy.WARN, componentModel = SPRING)
public abstract class ExpenseMapper {

    @Autowired
    protected CategoryService categoryService;
    @Autowired
    protected GroupService groupService;

    @Mapping(target = "category", source = "categoryId", qualifiedByName = "mapCategoryIdToCategory")
    @Mapping(target = "group", source = "groupId", qualifiedByName = "mapGroupIdToGroup")
    public abstract Expense toEntity(ExpenseDto userDto);

    @Mapping(target = "categoryId", source = "category.id")
    @Mapping(target = "debt", ignore = true)
    @Mapping(target = "groupId", source = "group.id")
    public abstract ExpenseDto toDto(Expense user);

    @Named("mapCategoryIdToCategory")
    Category mapCategoryIdToCategory(int categoryId) {
        return categoryService.findById(categoryId);
    }

    @Named("mapGroupIdToGroup")
    Group mapGroupIdToGroup(int groupId) {
        return groupService.findById(groupId);
    }
}
