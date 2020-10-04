from django import forms
from django.contrib.auth.forms import AuthenticationForm, UsernameField, UserCreationForm
from django.utils.translation import pgettext_lazy
from django.utils.text import capfirst


class CustomAuthenticationForm(AuthenticationForm):

    username = UsernameField(
        widget=forms.TextInput(
            attrs={
                'autofocus': True,
                'autocomplete': 'off',
                # 'class': 'form-control form-control-lg input-lg',
                'id': 'user-name',
                'placeholder': capfirst(pgettext_lazy('users', 'username')),
                'required': True,
            },
        ),
    )

    password = forms.CharField(
        widget=forms.PasswordInput(
            attrs={
               'autocomplete': 'off',
               # 'class': 'form-control form-control-lg input-lg',
               'id': 'user-password',
               'placeholder': capfirst(pgettext_lazy('users', 'password')),
               'required': True,
            },
        ),
    )


class CustomUserCreationForm(UserCreationForm):

    name = UsernameField(
        widget=forms.TextInput(
            attrs={
                'autofocus': True,
                'autocomplete': 'off',
                'class': 'form-control form-control-lg input-lg',
                'id': 'user-name',
                'placeholder': capfirst(pgettext_lazy('users', 'username')),
                'required': True},
        ),
    )

    email = forms.EmailField(
        widget=forms.EmailInput(
            attrs={'autofocus': True,
                   'autocomplete': 'off',
                   'class': 'form-control form-control-lg input-lg',
                   'id': 'user-email',
                   'placeholder': capfirst(pgettext_lazy('users', 'email')),
                   'required': True},
        ),
    )

    password1 = forms.CharField(
        widget=forms.PasswordInput(
            attrs={'autofocus': True,
                   'autocomplete': 'off',
                   'class': 'form-control form-control-lg input-lg',
                   'id': 'user-password1',
                   'placeholder': capfirst(pgettext_lazy('users', 'password')),
                   'required': True},
        ),
    )

    password2 = forms.CharField(
        widget=forms.PasswordInput(
            attrs={'autofocus': True,
                   'autocomplete': 'off',
                   'class': 'form-control form-control-lg input-lg',
                   'id': 'user-password2',
                   'placeholder': capfirst(pgettext_lazy('users', 'password')),
                   'required': True},
        ),
    )
