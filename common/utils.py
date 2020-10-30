from django.contrib import admin


def hardware_inline(model):
    def wrapped(cls):

        cls.model = model
        cls.extra = 0

        return cls
    return wrapped


class CustomModelAdmin(admin.ModelAdmin):

    fields = ('id', )
    # list_display_links = ("description",)
    # list_filter = ["manufacturer"]
    list_select_related = False
    preserve_filters = False
    # save_as = True
    # save_as_continue = False
    save_on_top = True
    # search_fields = ["inventory_number", "description"]
    # exclude = ("workstation", )
    readonly_fields = ('id', )


    # def get_list_workstations(self, obj):
    #     instance = obj.workstation_set.filter()
    #     if instance.exists():
    #         return [*instance]
    #     else:
    #         return []
    # get_list_workstations.short_description = "Рабочая станция"
