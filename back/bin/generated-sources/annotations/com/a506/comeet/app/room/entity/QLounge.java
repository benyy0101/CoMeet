package com.a506.comeet.app.room.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QLounge is a Querydsl query type for Lounge
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QLounge extends EntityPathBase<Lounge> {

    private static final long serialVersionUID = -240465389L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QLounge lounge = new QLounge("lounge");

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

    public QLounge(String variable) {
        this(Lounge.class, forVariable(variable), INITS);
    }

    public QLounge(Path<? extends Lounge> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QLounge(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QLounge(PathMetadata metadata, PathInits inits) {
        this(Lounge.class, metadata, inits);
    }

    public QLounge(Class<? extends Lounge> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.room = inits.isInitialized("room") ? new QRoom(forProperty("room"), inits.get("room")) : null;
    }

}

