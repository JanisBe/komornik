package com.example.demo.mapper;

import com.example.demo.dto.ExpenseDto;
import com.example.demo.entities.Category;
import com.example.demo.entities.Expense;
import com.example.demo.entities.User;
import com.example.demo.service.CategoryService;
import com.example.demo.service.UserService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring")
public abstract class ExpenseMapper {

    @Autowired
    protected CategoryService categoryService;

    @Autowired
    protected UserService userService;

    @Mapping(target = "category", source = "categoryId", qualifiedByName = "mapCategoryIdToCategory")
    @Mapping(target = "user", source = "userId", qualifiedByName = "mapUserIdToUser")
    public abstract Expense toEntity(ExpenseDto userDto);

    @Mapping(target = "categoryId", source = "category.id")
    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "split", ignore = true)
    public abstract ExpenseDto toDto(Expense user);

    @Named("mapCategoryIdToCategory")
    Category mapCategoryIdToCategory(int categoryId) {
        return categoryService.findById(categoryId);
    }

    @Named("mapUserIdToUser")
    User mapUserIdToUser(int userId) {
        return userService.findById(userId).orElseThrow();
    }
}
