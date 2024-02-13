package com.a506.comeet.app.etc.repository;

import com.a506.comeet.app.etc.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long>, NoteCustomRepository {
}
