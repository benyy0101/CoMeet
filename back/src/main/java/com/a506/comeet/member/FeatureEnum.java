package com.a506.comeet.member;

public enum FeatureEnum {
    EARTH("지구", "내 특성을 설정해주세요!"),
    PROBE("탐사선", "새로운 기술을 탐험하는 것을 좋아해요"),
    BLACKHOLE("블랙홀", "한 기술에 깊게 몰입하는 것을 좋아해요"),
    SUN("태양", "다른 사람들과 함께 스터디를 이끄는 것을 좋아해요."),
    MOON("달", "주도적이지는 않지만 뒤에서 꾸준하고 열심히 스터디에 참여해요"),
    GALAXY("은하수", "새로운 사람들을 만나는데 거부감이 없어요");
    private String name;
    private String description;

    FeatureEnum(String name, String description) {
        this.name = name;
        this.description = description;
    }
}
