package com.a506.comeet.app.keyword.repository;

import com.a506.comeet.app.keyword.entity.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface KeywordRepository extends JpaRepository<Keyword, Long> {

    Optional<Keyword> findByIdAndIsDeletedFalse(Long id);

    Boolean existsByName(String name);
}
