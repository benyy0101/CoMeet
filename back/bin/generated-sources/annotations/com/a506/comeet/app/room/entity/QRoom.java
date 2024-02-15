package com.a506.comeet.app.room.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QRoom is a Querydsl query type for Room
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRoom extends EntityPathBase<Room> {

    private static final long serialVersionUID = 875905012L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QRoom room = new QRoom("room");

    public final com.a506.comeet.common.QBaseEntity _super = new com.a506.comeet.common.QBaseEntity(this);

    public final NumberPath<Integer> capacity = createNumber("capacity", Integer.class);

    public final ListPath<Channel, QChannel> channels = this.<Channel, QChannel>createList("channels", Channel.class, QChannel.class, PathInits.DIRECT2);

    public final EnumPath<com.a506.comeet.common.enums.RoomConstraints> constraints = createEnum("constraints", com.a506.comeet.common.enums.RoomConstraints.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final StringPath description = createString("description");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final BooleanPath isDeleted = _super.isDeleted;

    public final BooleanPath isLocked = createBoolean("isLocked");

    public final ListPath<Lounge, QLounge> lounges = this.<Lounge, QLounge>createList("lounges", Lounge.class, QLounge.class, PathInits.DIRECT2);

    public final com.a506.comeet.app.member.entity.QMember manager;

    public final NumberPath<Integer> mcount = createNumber("mcount", Integer.class);

    public final StringPath notice = createString("notice");

    public final StringPath password = createString("password");

    public final StringPath roomImage = createString("roomImage");

    public final ListPath<com.a506.comeet.app.keyword.entity.RoomKeyword, com.a506.comeet.app.keyword.entity.QRoomKeyword> roomKeywords = this.<com.a506.comeet.app.keyword.entity.RoomKeyword, com.a506.comeet.app.keyword.entity.QRoomKeyword>createList("roomKeywords", com.a506.comeet.app.keyword.entity.RoomKeyword.class, com.a506.comeet.app.keyword.entity.QRoomKeyword.class, PathInits.DIRECT2);

    public final ListPath<RoomMember, QRoomMember> roomMembers = this.<RoomMember, QRoomMember>createList("roomMembers", RoomMember.class, QRoomMember.class, PathInits.DIRECT2);

    public final StringPath title = createString("title");

    public final EnumPath<com.a506.comeet.common.enums.RoomType> type = createEnum("type", com.a506.comeet.common.enums.RoomType.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QRoom(String variable) {
        this(Room.class, forVariable(variable), INITS);
    }

    public QRoom(Path<? extends Room> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QRoom(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QRoom(PathMetadata metadata, PathInits inits) {
        this(Room.class, metadata, inits);
    }

    public QRoom(Class<? extends Room> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.manager = inits.isInitialized("manager") ? new com.a506.comeet.app.member.entity.QMember(forProperty("manager")) : null;
    }

}

