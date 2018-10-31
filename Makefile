PROJECT_NAME = woots-node-client
HELP_BUILD = "make build = build the docker image"
HELP_UP = "make up = start the container via docker-compose"
HELP_DOWN = "make down = stop the container via docker-compose"
HELP_SHARED = "make import-shared = copy shared dependencies into the project"

.PHONY: all help build up down import-shared

all: help 
help:
	@echo "\nConvenient shortcuts to work with the $(PROJECT_NAME) Docker image."
	@echo "Please ensure you have a docker-compose.yml file setup with your options.\n"
	@echo "Usage: \n\n$(HELP_BUILD)\n$(HELP_UP)\n$(HELP_DOWN)\n$(HELP_SHARED)"
build: import-shared
	@docker-compose build 
up:
	@docker-compose up -d
down:
	@docker-compose down
	
# TODO: use git submodules when splitting project separte repos
import-shared:
	@rm -rf src/shared
	@cp -rf ../woots-shared src/shared	