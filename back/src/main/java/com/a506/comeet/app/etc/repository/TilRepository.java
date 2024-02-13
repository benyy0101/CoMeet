package com.a506.comeet.app.etc.repository;

import com.a506.comeet.app.etc.entity.Til;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TilRepository extends JpaRepository<Til, Long>, TilCustomRepository{
}
