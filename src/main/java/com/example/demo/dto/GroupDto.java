package com.example.demo.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.example.demo.entities.Group} entity
 */
public class GroupDto implements Serializable {

    private final Integer id;
    private final String groupName;
    private final String groupDescription;

    public GroupDto(Integer id, String groupName, String groupDescription) {
        this.id = id;
        this.groupName = groupName;
        this.groupDescription = groupDescription;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        GroupDto entity = (GroupDto) o;
        return Objects.equals(this.id, entity.id) &&
                Objects.equals(this.groupName, entity.groupName) &&
                Objects.equals(this.groupDescription, entity.groupDescription);
    }

    public String getGroupDescription() {
        return groupDescription;
    }

    public String getGroupName() {
        return groupName;
    }

    public Integer getId() {
        return id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, groupName, groupDescription);
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
                "id = " + id + ", " +
                "groupName = " + groupName + ", " +
                "groupDesc = " + groupDescription + ")";
    }
}