package com.project.ecommerce.service.interf;

import com.project.ecommerce.dto.AddressDto;
import com.project.ecommerce.dto.Response;

public interface AddressService {
    Response saveAndUpdateAddress(AddressDto addressDto);
}
