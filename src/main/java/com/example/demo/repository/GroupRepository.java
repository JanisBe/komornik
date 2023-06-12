package com.example.demo.repository;

import com.example.demo.entities.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GroupRepository extends JpaRepository<Group, Integer> {
    @Query(value = "select distinct g from Group g join User u where u.id = :id")
    List<Group> findAllGroupsForUser(Integer id);

    @Query(value = "select distinct g.default_currency from `groups` g " +
            "where g.id  = :id", nativeQuery = true)
    String findDefaultCurrencyById(int id);

}