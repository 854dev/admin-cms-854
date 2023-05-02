import axios, { AxiosPromise } from "axios";
import * as common from "types/common";
import * as dto from "types/dto";

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export function getContentList(
  req: dto.PagedRequest
): AxiosPromise<common.PagedResponse<common.ContentMeta>> {
  return axios.get(`${backendUrl}/content`, { params: req });
}

export function getContentDetail(
  id: common.ID
): AxiosPromise<common.ContentDetail> {
  return axios.get(`${backendUrl}/content/${id}`);
}

export function postContent(
  dto: dto.CreateContentDto
): AxiosPromise<common.MessageResponse> {
  return axios.post(`${backendUrl}/content`, dto);
}

export function putContent(
  dto: dto.UpdateContentDto
): AxiosPromise<common.MessageResponse> {
  return axios.put(`${backendUrl}/content/${dto.contentId}`, dto);
}

export function deleteContent(
  id: common.ID
): AxiosPromise<common.MessageResponse> {
  return axios.delete(`${backendUrl}/content/${id}`);
}

export function getContentTypeList(
  req: dto.PagedRequest
): AxiosPromise<common.PagedResponse<common.ContentType>> {
  return axios.get(`${backendUrl}/content-type`, { params: req });
}

export function postContentType(
  body: dto.CreateContentTypeDto
): AxiosPromise<any> {
  return axios.post(`${backendUrl}/content-type`, body);
}

export function putContentType(
  id: common.ID
): AxiosPromise<common.MessageResponse> {
  return axios.put(`${backendUrl}/content-type/${id}`);
}

export function deleteContentType(
  id: common.ID
): AxiosPromise<common.MessageResponse> {
  return axios.delete(`${backendUrl}/content-type/${id}`);
}

export function getContentTypeDetail(
  id: common.ID
): AxiosPromise<common.ContentTypeDetail> {
  return axios.get(`${backendUrl}/content-type/${id}`);
}

export function postBodySchema(
  body: dto.CreateBodySchemaDto
): AxiosPromise<common.MessageResponse> {
  return axios.post(`${backendUrl}/content-body-schema`, body);
}

export function deleteBodySchema(
  id: common.ID
): AxiosPromise<common.MessageResponse> {
  return axios.delete(`${backendUrl}/content-body-schema/${id}`);
}

export function postTag(
  body: dto.CreateTagDto
): AxiosPromise<common.MessageResponse> {
  return axios.post(`${backendUrl}/tag`, body);
}

export function getTag(): AxiosPromise<common.ContentTag[]> {
  return axios.get(`${backendUrl}/tag`);
}

export function putTag(
  body: dto.UpdateTagDto
): AxiosPromise<common.MessageResponse> {
  return axios.put(`${backendUrl}/tag/${body.tagId}`, body);
}

export function deleteTag(id: common.ID): AxiosPromise<common.MessageResponse> {
  return axios.delete(`${backendUrl}/tag/${id}`);
}

const api = {
  getContentList,
  getContentDetail,
  postContent,
  putContent,
  deleteContent,
  getContentTypeList,
  postContentType,
  putContentType,
  deleteContentType,
  getContentTypeDetail,
  postBodySchema,
  deleteBodySchema,
  postTag,
  getTag,
  putTag,
  deleteTag,
};
export default api;
