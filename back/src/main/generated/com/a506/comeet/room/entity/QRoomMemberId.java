package com.a506.comeet.room.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QRoomMemberId is a Querydsl query type for RoomMemberId
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QRoomMemberId extends BeanPath<RoomMemberId> {

    private static final long serialVersionUID = 1977723964L;

    public static final QRoomMemberId roomMemberId = new QRoomMemberId("roomMemberId");

    public final StringPath memberId = createString("memberId");

    public final NumberPath<Long> roomId = createNumber("roomId", Long.class);

    public QRoomMemberId(String variable) {
        super(RoomMemberId.class, forVariable(variable));
    }

    public QRoomMemberId(Path<? extends RoomMemberId> path) {
        super(path.getType(), path.getMetadata());
    }

    public QRoomMemberId(PathMetadata metadata) {
        super(RoomMemberId.class, metadata);
    }

}

