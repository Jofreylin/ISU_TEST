CREATE DATABASE [ISU_CORP_TEST]
GO
USE [ISU_CORP_TEST]
GO



CREATE TABLE ToDo(
	TaskId INT IDENTITY(1,1) PRIMARY KEY,
	Title varchar(200) not null,
	Description varchar(max),
	DueDate datetime,
	IsCompleted bit not null default(0),
	IsRecordActive bit not null default(1),
	CreatedAt datetime,
	ModifiedAt	datetime,
);

