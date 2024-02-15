package com.a506.comeet.app.member.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMember is a Querydsl query type for Member
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMember extends EntityPathBase<Member> {

    private static final long serialVersionUID = 875819698L;

    public static final QMember member = new QMember("member1");

    public final com.a506.comeet.common.QBaseEntity _super = new com.a506.comeet.common.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final StringPath description = createString("description");

    public final StringPath email = createString("email");

    public final EnumPath<com.a506.comeet.common.enums.MemberFeature> feature = createEnum("feature", com.a506.comeet.common.enums.MemberFeature.class);

    //inherited
    public final BooleanPath isDeleted = _super.isDeleted;

    public final ListPath<Like, QLike> likes = this.<Like, QLike>createList("likes", Like.class, QLike.class, PathInits.DIRECT2);

    public final StringPath link = createString("link");

    public final StringPath memberId = createString("memberId");

    public final StringPath name = createString("name");

    public final StringPath nickname = createString("nickname");

    public final StringPath password = createString("password");

    public final StringPath profileImage = createString("profileImage");

    public final ListPath<String, StringPath> roles = this.<String, StringPath>createList("roles", String.class, StringPath.class, PathInits.DIRECT2);

    public final ListPath<com.a506.comeet.app.room.entity.RoomMember, com.a506.comeet.app.room.entity.QRoomMember> roomMembers = this.<com.a506.comeet.app.room.entity.RoomMember, com.a506.comeet.app.room.entity.QRoomMember>createList("roomMembers", com.a506.comeet.app.room.entity.RoomMember.class, com.a506.comeet.app.room.entity.QRoomMember.class, PathInits.DIRECT2);

    public final ListPath<com.a506.comeet.app.etc.entity.Til, com.a506.comeet.app.etc.entity.QTil> tils = this.<com.a506.comeet.app.etc.entity.Til, com.a506.comeet.app.etc.entity.QTil>createList("tils", com.a506.comeet.app.etc.entity.Til.class, com.a506.comeet.app.etc.entity.QTil.class, PathInits.DIRECT2);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QMember(String variable) {
        super(Member.class, forVariable(variable));
    }

    public QMember(Path<? extends Member> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMember(PathMetadata metadata) {
        super(Member.class, metadata);
    }

}

