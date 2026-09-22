.PHONY: component

# Scaffold a new component with all required files, wired into the
# component -> src/components -> src three-level export chain.
#
# Usage: make component NAME=Badge
component:
ifndef NAME
	$(error Usage: make component NAME=ComponentName  e.g. make component NAME=Badge)
endif
	@bash scripts/create-component.sh $(NAME)
