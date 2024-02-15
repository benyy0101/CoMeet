package com.a506.comeet.app.room.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QRoomMember is a Querydsl query type for RoomMember
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRoomMember extends EntityPathBase<RoomMember> {

    private static final long serialVersionUID = 362934190L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QRoomMember roomMember = new QRoomMember("roomMember");

    public final com.a506.comeet.common.QBaseEntity _super = new com.a506.comeet.common.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final BooleanPath isDeleted = _super.isDeleted;

    public final com.a506.comeet.app.member.entity.QMember member;

    public final QRoom room;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QRoomMember(String variable) {
        this(RoomMember.class, forVariable(variable), INITS);
    }

    public QRoomMember(Path<? extends RoomMember> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QRoomMember(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QRoomMember(PathMetadata metadata, PathInits inits) {
        this(RoomMember.class, metadata, inits);
    }

    public QRoomMember(Class<? extends RoomMember> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new com.a506.comeet.app.member.entity.QMember(forProperty("member")) : null;
        this.room = inits.isInitialized("room") ? new QRoom(forProperty("room"), inits.get("room")) : null;
    }

}

