package com.a506.comeet.app.etc.controller.dto;

import lombok.Getter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
public class TilListResponseDto {

    private List<TilContentResponseDto> content = new ArrayList<>();

    public void of(Long id, LocalDate date){
        this.content.add(new TilContentResponseDto(id, date));
    }

    static class TilContentResponseDto implements Comparable<TilContentResponseDto> {
        private Long id;
        private LocalDate date;

        public TilContentResponseDto(Long id, LocalDate date) {
            this.id = id;
            this.date = date;
        }

        @Override
        public int compareTo(TilContentResponseDto o) {
            return date.compareTo(o.date);
        }

    }

}
