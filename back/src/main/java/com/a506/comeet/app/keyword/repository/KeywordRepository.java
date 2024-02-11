package com.a506.comeet.app.keyword.repository;

import com.a506.comeet.app.keyword.entity.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KeywordRepository extends JpaRepository<Keyword, Long> {

    boolean existsByName(String name);
}
