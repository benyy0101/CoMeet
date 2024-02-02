package com.a506.comeet.app.etc.controller.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
public class TilListResponseDto {

    private List<TilContentResponseDto> content = new ArrayList<>();

    public void of(Long id, LocalDate date){
        this.content.add(new TilContentResponseDto(id, date));
    }

    @JsonSerialize
    @Getter
    public static class TilContentResponseDto implements Comparable<TilContentResponseDto> {
        private Long id;
        @JsonFormat(pattern = "yyyy-MM-dd")
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
