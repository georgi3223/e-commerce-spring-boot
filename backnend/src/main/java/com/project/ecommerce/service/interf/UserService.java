package com.project.ecommerce.service.interf;

import com.project.ecommerce.dto.LoginRequest;
import com.project.ecommerce.dto.Response;
import com.project.ecommerce.dto.UserDto;
import com.project.ecommerce.entity.User;

public interface UserService {
    Response registerUser(UserDto registrationRequest);
    Response loginUser(LoginRequest loginRequest);
    Response getAllUsers();
    User getLoginUser();
    Response getUserInfoAndOrderHistory();
}
