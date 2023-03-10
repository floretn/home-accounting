create schema if not exists ha_data;

create table if not exists ha_data.t_auth_info(
    ai_pk           bigserial,
    ai_email        character varying (255),
    ai_pwd          character varying (255),
    primary key (ai_pk)
);

create table if not exists ha_data.t_users(
    usr_pk          bigserial,
    usr_ai_fk       bigint,
    usr_name        character varying (32),
    usr_locale      character varying (16),
    usr_bill        int,
    primary key (usr_pk),
    foreign key (usr_ai_fk) references ha_data.t_auth_info(ai_pk)
);

create table if not exists ha_data.t_categories(
    cat_pk          bigserial,
    cat_usr_fk      bigint,
    cat_ttl         character varying (255),
    cat_lim         int,
    primary key (cat_pk),
    foreign key (cat_usr_fk) references ha_data.t_users(usr_pk)
);

create table if not exists ha_data.t_records(
     rec_pk          bigserial,
     rec_cat_fk      bigint,
     rec_amount      int,
     rec_desc        character varying (255),
     rec_type        character varying (15),
     rec_date        timestamp,
     primary key (rec_pk),
     foreign key (rec_cat_fk) references ha_data.t_categories(cat_pk)
);