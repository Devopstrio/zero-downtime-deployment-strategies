.PHONY: help build up down seed test

help:
	@echo "Zero Downtime Deployment - Management Commands"
	@echo "--------------------------------------------"
	@echo "build     : Build all containers"
	@echo "up        : Start all services"
	@echo "down      : Stop all services"
	@echo "deploy    : Run blue/green deployment"
	@echo "rollback  : Trigger emergency rollback"
	@echo "test      : Run system tests"

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

deploy:
	python scripts/deploy/blue_green.py

rollback:
	python scripts/rollback/trigger_rollback.py

test:
	pytest tests/
