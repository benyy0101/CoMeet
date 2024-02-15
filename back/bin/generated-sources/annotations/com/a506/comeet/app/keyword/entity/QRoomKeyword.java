package com.a506.comeet.app.keyword.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QRoomKeyword is a Querydsl query type for RoomKeyword
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRoomKeyword extends EntityPathBase<RoomKeyword> {

    private static final long serialVersionUID = 348684841L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QRoomKeyword roomKeyword = new QRoomKeyword("roomKeyword");

    public final com.a506.comeet.common.QBaseEntity _super = new com.a506.comeet.common.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final BooleanPath isDeleted = _super.isDeleted;

    public final QKeyword keyword;

    public final com.a506.comeet.app.room.entity.QRoom room;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QRoomKeyword(String variable) {
        this(RoomKeyword.class, forVariable(variable), INITS);
    }

    public QRoomKeyword(Path<? extends RoomKeyword> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QRoomKeyword(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QRoomKeyword(PathMetadata metadata, PathInits inits) {
        this(RoomKeyword.class, metadata, inits);
    }

    public QRoomKeyword(Class<? extends RoomKeyword> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.keyword = inits.isInitialized("keyword") ? new QKeyword(forProperty("keyword")) : null;
        this.room = inits.isInitialized("room") ? new com.a506.comeet.app.room.entity.QRoom(forProperty("room"), inits.get("room")) : null;
    }

}

