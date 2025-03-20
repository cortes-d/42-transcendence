# Makefile for application management

.PHONY: build start stop logs test clean

build:
	docker compose build

start:
	docker compose up -d

stop:
	docker compose down

logs:
	docker compose logs -f

test:
	docker ompose exec app npm test

clean:
	docker system prune -af
	docker volume prune -f