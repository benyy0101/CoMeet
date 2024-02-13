package com.a506.comeet.metadata.entity;

import com.querydsl.core.types.Path;
import com.querydsl.core.types.PathMetadata;
import com.querydsl.core.types.PathMetadataFactory;
import com.querydsl.core.types.dsl.*;

import java.time.LocalDateTime;

// MongoDb의 Qdata는 직접 만들어줘야 한다
public class QMetadata extends EntityPathBase<Metadata> {
    private static final long serialVersionUID = 1L;

    public static final QMetadata metadata = new QMetadata("metadata");

    public final NumberPath<Long> id = createNumber("id", Long.class);
    public final StringPath memberId = createString("memberId");
    public final NumberPath<Long> roomId = createNumber("roomId", Long.class);
    public final DateTimePath<LocalDateTime> enterTime = createDateTime("enterTime", LocalDateTime.class);
    public final DateTimePath<LocalDateTime> leaveTime = createDateTime("leaveTime", LocalDateTime.class);
    public final StringPath keywords = createString("keywords");

    public QMetadata(String variable) {
        super(Metadata.class, PathMetadataFactory.forVariable(variable));
    }

    public QMetadata(Path<? extends Metadata> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMetadata(PathMetadata metadata) {
        super(Metadata.class, metadata);
    }
}