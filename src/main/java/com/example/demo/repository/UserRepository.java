package com.example.demo.repository;

import com.example.demo.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByMail(String mail);


    @Query(value = "select distinct u.* from user_x_group uxg " +
            "left join  users u on u.id = uxg.user_id " +
            "where uxg.group_id in (select uxg2.group_id from user_x_group uxg2 " +
            "                       where uxg2.user_id = :userId)", nativeQuery = true)
    List<User> findCommonUsers(int userId);

    @Query(value = "select u from User u " +
            "left join Group g where g.id = :groupId")
    List<User> findUsersInGroup(int groupId);
}
