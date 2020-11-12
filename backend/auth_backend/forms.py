from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import get_user_model

from account.models import RequestUser


class RequestUserForm(forms.ModelForm):

	email = forms.EmailField(required=True)

	class Meta:
		model = RequestUser
		fields = (
			'name',
			'email',
			'phone',
		)


class UserRegisterForm(UserCreationForm):

	email = forms.EmailField(required=True)
	password2 = forms.EmailField(required=False)

	class Meta:
		model = get_user_model()
		fields = (
			'first_name',
			'last_name',
			'email',
			'username',
			'password1',
			'password2',
		)

	def save(self, commit=True):

		user = super().save(commit=False)
		user.email = self.cleaned_data['email']

		if commit:
			user.save()

		return user