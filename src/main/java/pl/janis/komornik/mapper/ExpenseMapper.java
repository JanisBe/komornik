package pl.janis.komornik.mapper;

import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;
import pl.janis.komornik.dto.ExpenseDto;
import pl.janis.komornik.entities.Category;
import pl.janis.komornik.entities.Expense;
import pl.janis.komornik.entities.Group;
import pl.janis.komornik.service.CategoryService;
import pl.janis.komornik.service.GroupService;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(unmappedTargetPolicy = ReportingPolicy.WARN, componentModel = SPRING, uses = DebtMapper.class)
public abstract class ExpenseMapper {

    @Autowired
    protected CategoryService categoryService;
    @Autowired
    protected GroupService groupService;

    @Mapping(target = "category", source = "categoryId", qualifiedByName = "mapCategoryIdToCategory")
    @Mapping(target = "group", source = "groupId", qualifiedByName = "mapGroupIdToGroup")
    public abstract Expense toEntity(ExpenseDto userDto);

    @AfterMapping
    protected void addExpenseToDebt(@MappingTarget Expense expense) {
        expense.getDebt().forEach(debt -> debt.setExpense(expense));
    }

    @Mapping(target = "categoryId", source = "category.id")
    @Mapping(target = "groupId", source = "group.id")
    public abstract ExpenseDto toDto(Expense user);

    @Named("mapCategoryIdToCategory")
    Category mapCategoryIdToCategory(int categoryId) {
        if (categoryId != 0) {
            return categoryService.findById(categoryId);
        } else return null;
    }

    @Named("mapGroupIdToGroup")
    Group mapGroupIdToGroup(int groupId) {
        return groupService.findById(groupId);
    }
}