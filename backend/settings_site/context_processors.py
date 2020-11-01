from .models import SettingsSite


def settings_site(request):
    return {'settings_site': SettingsSite.objects.filter(is_active=True).first()}
