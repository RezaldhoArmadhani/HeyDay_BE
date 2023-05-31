-- ----------------------------------------
-- -- TABLE WORKER --
-- ----------------------------------------

create table workers (
    id_worker varchar(255) primary key,
    name varchar(255) not null,
    email varchar(255) not null,
    phone varchar(255) not null,
    password varchar(255) not null,
    jobdesk varchar(255),
    description varchar(255),
    address varchar(255),
    workplace varchar(255),
    role varchar(255)
)

create table recruiters (
    id_recruiter varchar(255) primary key,
    name varchar(255) not null,
    email varchar(255) not null,
    phone varchar(255) not null,
    position varchar(255) not null,
    password varchar(255) not null,
    job_field varchar(255),
    city varchar(255),
    description varchar(255),
    instagram varchar(255),
    linkedin varchar(255),
    company_name varchar(255),
    role varchar(255)
)

create table skills (
    id_skill varchar(255) primary key,
    name varchar(255) not null,
    id_worker varchar(255),
    CONSTRAINT fk_worker FOREIGN KEY (id_worker) REFERENCES workers(id_worker)
)

create table portfolio (
    id_portfolio varchar(255) primary key,
    name varchar(255) not null,
    repository varchar(255),
    type varchar(255),
    id_worker varchar(255),
    CONSTRAINT fk_worker FOREIGN KEY (id_worker) REFERENCES workers(id_worker)
)

create table experiences (
    id_experience varchar(255) primary key,
    id_worker varchar(255),
    CONSTRAINT fk_worker FOREIGN KEY (id_worker) REFERENCES workers(id_worker),
    company_name varchar(255),
    jobdesk varchar(255),
    date_start date,
    date_end date,
    description varchar(255)
)


-- ----------------------------------------
-- -- TABLE SELLER --
-- ----------------------------------------

create table seller (
    id_seller varchar(255) not null primary key,
    fullname varchar(255) not null,
    gender jk not null,
    phone varchar(25) not null,
    email varchar(255) not null,
    password varchar(255) not null,
    dob date,
    role varchar not null
);


-- -----------------------------------------
-- -- TABLE CATEGORY -- 
-- -----------------------------------------

create table category (
    id_category int not null primary key,
    name_category varchar(255) not null
)

-- -----------------------------------------
-- -- TABLE PRODUCT --
-- -----------------------------------------

create table product (
    id_products varchar primary key,
    name varchar(255) not null,
    stock int not null,
    price int not null,
    photo varchar(255) not null,
    description varchar(255) not null,
    id_category int,
    CONSTRAINT fk_category FOREIGN KEY (id_category) REFERENCES category(id_category)
);


select workers.*, skills.*, portfolios.* from workers inner join skills on workers.id_worker = skills.id_worker inner join portfolios on workers.id_worker = portfolios.id_worker;

select workers.id_worker, workers.name, workers.email, workers.phone, workers.jobdesk, workers.description, workers.address, workers.workplace , skills.name_skill , portfolios.name_portfolio, portfolios.repo_link, portfolios.type_portfolio , experiences.company_name, experiences.jobdesk, experiences.date_start, experiences.date_end, experiences.description experiences_ from workers left join skills on workers.id_worker = skills.id_worker left join portfolios on workers.id_worker = portfolios.id_worker left join experiences on workers.id_worker=experiences.id_worker where workers.id_worker='fd8386bd-52b6-4320-bdb0-126d313eb055'