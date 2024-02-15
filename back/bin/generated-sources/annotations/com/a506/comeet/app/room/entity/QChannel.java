package com.a506.comeet.app.room.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QChannel is a Querydsl query type for Channel
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QChannel extends EntityPathBase<Channel> {

    private static final long serialVersionUID = 1519041354L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QChannel channel = new QChannel("channel");

    public final com.a506.comeet.common.QBaseEntity _super = new com.a506.comeet.common.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final BooleanPath isDeleted = _super.isDeleted;

    public final StringPath name = createString("name");

    public final QRoom room;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QChannel(String variable) {
        this(Channel.class, forVariable(variable), INITS);
    }

    public QChannel(Path<? extends Channel> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QChannel(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QChannel(PathMetadata metadata, PathInits inits) {
        this(Channel.class, metadata, inits);
    }

    public QChannel(Class<? extends Channel> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.room = inits.isInitialized("room") ? new QRoom(forProperty("room"), inits.get("room")) : null;
    }

}

